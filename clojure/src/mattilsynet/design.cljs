(ns mattilsynet.design
  (:require-macros [mattilsynet.design]))

(def svgs (atom {}))

(defn load-svg! [id hiccup]
  (swap! svgs assoc id hiccup))

(defn ^:export get-loaded-svgs []
  (keys @svgs))

(defn ^:export render-svg [id & [attrs]]
  (if-let [svg (get @svgs id)]
    (update svg 1 merge attrs)
    (throw (js/Error. (str "SVG " id " is not loaded. Try loading it with `load-svg!`, or check that it exists.")))))
