(ns mattilsynet.build
  (:require [babashka.fs :as fs]
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojure.java.shell :as shell]
            [clojure.pprint :as pprint]
            [clojure.string :as str]
            [hickory.core :as hiccup])
  (:import (java.io File)))

(defn get-dir [path]
  (let [file (fs/file (fs/normalize (fs/absolutize (io/file path))))]
    (cond-> file
      (not (.isDirectory file)) .getParentFile
      :then .getPath)))

(defn strip-dot-slash [path]
  (str/replace path #"^\./?" ""))

(defn resolve-export-dir->pattern
  "Takes an export pair from package.json, like:

  ```js
  {
      \"./icons/*\": \"./mtds/icons/*\",
      ...
  }
  ```

  And resolves it to a globbable pattern and a source directory. This pair can
  be used to find all the referenced files and retain the proper relative path
  so we can export them to a similar place on the classpath."
  [[source exported]]
  ;; Buckle up...
  (let [pattern (strip-dot-slash source) ;; "./icons/*" => "icons/*"
        export-path (strip-dot-slash exported)] ;; "./mtds/icons/*" => "mtds/icons/*"
    [(-> (str "../" (first (str/split pattern #"/?\*"))) ;; => "../icons"
         get-dir ;; => "/Users/christian/work/design"
         (str "/" (str/replace export-path pattern ""))
         (str/replace #"/$" "")) ;; "/Users/christian/work/design/mtds/icons"
     pattern]))

(def package-json (json/read-str (slurp (io/resource "package.json"))))

(def exports
  (->> (get package-json "exports")
       (filter (comp string? second))
       (map resolve-export-dir->pattern)
       (mapcat
        (fn [[dir pattern]]
          (->> (fs/glob dir pattern)
               (mapcat #(file-seq (fs/file %)))
               (filter #(.isFile ^File %))
               (map (fn [^File file]
                      {:path (str/replace (.getPath file) (str dir "/") "")
                       :file file})))))))

(defn ensure-dir! [^String dir]
  (.mkdirs (io/file dir)))

(defn ensure-parent-dir! [^String path]
  (ensure-dir! (.getParent (io/file path))))

(defn load-css-modules [json-str]
  (->> (json/read-str json-str)
       (map
        (fn [[k classes]]
          [(keyword k) (str/split classes #" ")]))
       (into (sorted-map ))))

(defn export-css-modules [file class->classes]
  (ensure-parent-dir! file)
  (spit file (with-out-str
               (pprint/pprint class->classes))))

(defn find-css-modules-export []
  (->> (filter (comp #{"styles.json"} :path) exports)
       first
       :file
       slurp))

(defn build-css-modules [& _]
  (->> (find-css-modules-export)
       load-css-modules
       (export-css-modules "resources/mattilsynet-design/css-modules.edn")))

(defn to-hiccup [markup]
  (-> markup
      hiccup/parse
      hiccup/as-hiccup
      first
      last
      last
      (update-in [1] #(-> % (dissoc :viewbox) (assoc :viewBox (:viewbox %))))))

(defn export-svg [{:keys [^File file path]}]
  (let [hiccup-target (str "resources/mattilsynet-design/" path)
        svg-target (str "resources/public/mtds/" path)
        content (slurp file)]
    (ensure-parent-dir! hiccup-target)
    (ensure-parent-dir! svg-target)
    (spit (str/replace hiccup-target #"\.svg$" ".edn") (to-hiccup content))
    (spit svg-target content)))

(defn export-all-svgs [& _]
  (->> exports
       (filter #(str/ends-with? (:path %) ".svg"))
       (run! export-svg)))

(defn load-committed-pom []
  (:out (shell/sh "git" "cat-file" "-p" "HEAD:clojure/pom.xml")))

(defn load-committed-readme []
  (:out (shell/sh "git" "cat-file" "-p" "HEAD:clojure/README.md")))

(defn get-version [pom]
  (second (re-find #"<version>([\d\.]+)</version>" pom)))

(defn get-release-number [pom]
  (parse-long (last (str/split (get-version pom) #"\."))))

(defn bump-version [& _]
  (let [pom (load-committed-pom)
        release-num (get-release-number pom)
        mtds-version (get package-json "version")
        next (str mtds-version "." (inc release-num))]
    (spit "pom.xml" (str/replace pom (str mtds-version "." release-num) next))
    (spit "README.md" (str/replace (load-committed-readme) (str mtds-version "." release-num) next))
    (println next)))
