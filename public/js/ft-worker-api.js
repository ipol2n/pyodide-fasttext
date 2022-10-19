const ftWorker = new Worker("./ft-webworker.js", { type: "module" });

export function run(text, onSuccess, onError) {
  ftWorker.onerror = onError;
  ftWorker.onmessage = (e) => onSuccess(e.data);
  ftWorker.postMessage({
    text,
  });
}

export function asyncRun(text) {
  return new Promise(function (onSuccess, onError) {
    run(text, onSuccess, onError);
  });
}
