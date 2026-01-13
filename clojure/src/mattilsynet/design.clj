(ns mattilsynet.design
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(def class-idx (read-string (slurp (io/resource "mattilsynet-design/css-modules.edn"))))
(def illustrations-dir "illustrations")
(def icons-dir "icons")

(defmacro ^:export c [& classes]
  (->> classes
       (mapcat
        (fn [class]
          (get class-idx (if (keyword? class) (name class) class) [class])))
       (cons 'list)))

(defmacro ^:export classes [& classes]
  `(c ~@classes))

(defn ^:export load-svg
  "Loads an SVG from the design system"
  [path]
  (slurp (io/resource (str "public/mtds/" path ".svg"))))

(def base-path "mattilsynet-design")

(defn get-svg-path [id]
  (case (namespace id)
    "icon"
    (str base-path "/" icons-dir "/" (name id) ".edn")

    "illustration"
    (str base-path "/" illustrations-dir "/"
         (str/replace (name id) #"\." "/") ".edn")

    (throw (ex-info "Unknown svg kind, use either :icon/* or :illustration/*" {:id id}))))

(defn load-svg-resource [id]
  (-> (get-svg-path id)
      io/resource
      slurp
      read-string))

(defn ^:export render-svg [id & [attrs]]
  (if-let [svg (load-svg-resource id)]
    (update svg 1 merge attrs)
    (throw (ex-info (str "SVG " id " does not exist") {:id id}))))

(defn load-svg! [_id _resource])

(defmacro ^:export svg [id]
  (if (:ns &env)
    ;; ClojureScript må laste svg-en inn i bygget
    `(do
       (mattilsynet.design/load-svg! ~id ~(load-svg-resource id))
       ~id)
    ;; Clojure laster svg-en dynamisk ved bruk
    id))

(defn get-ids [path ns]
  (let [all-your-base (str base-path "/" path)]
    (->> (io/resource all-your-base)
         io/file
         file-seq
         (map str)
         (filter #(re-find #"\.edn$" %))
         (map #(second (str/split % (re-pattern (str all-your-base "/")))))
         (map #(keyword ns (-> %
                               (str/replace #"\.edn$" "")
                               (str/replace #"/" "."))))
         sort
         vec)))

(defmacro ^:export get-icon-ids []
  (get-ids icons-dir "icon"))

(defmacro ^:export get-illustration-ids []
  (get-ids illustrations-dir "illustration"))
