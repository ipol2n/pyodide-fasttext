// ft-webworker.js

import { FastText, addOnPostRun } from "./js/fasttext/fasttext.js";

const initFastText = async () => {
  return new Promise((resolve, reject) => {
    addOnPostRun(async () => {
      const ft = new FastText();
      const _model = ft.loadModel("./js/fasttext/model.bin");
      resolve(_model);
    });
  });
};

const initPromise = initFastText();
let model;

onmessage = async (event) => {
  if (!model) {
    model = await initPromise;
  }
  const { text } = event.data;
  try {
    const prediction = await model.predict(text);
    const label = prediction.get(0)[1];
    const confidence = prediction.get(0)[0];
    postMessage({
      label,
      confidence,
    });
  } catch (error) {
    postMessage({ error: error.message });
  }
};
