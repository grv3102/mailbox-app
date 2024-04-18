/// <reference lib="webworker" />

type MessageRequest = {
  action: string;
  chunk?: number;
  chunkSize?: number;
};

type MessageData = {
  id: number;
  sendName: string;
  message: string;
  sentDateTime: string;
  imageUrl: string;
};

self.addEventListener('install', (event: any) => {
  (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
  console.log('Service worker installed');
});

self.addEventListener('activate', (event: any) => {
  console.log('Service worker activated');
});

function generateMessage(id: number): MessageData {
  const sendNames = [
    'Alice',
    'Bob',
    'Charlie',
    'Dana',
    'Eli',
    'Fiona',
    'George',
    'Hannah',
  ];
  const messages = [
    'Just read a great book on the history of architecture, thought you might like it too!',
    'Could you please send the project documents we discussed yesterday? I need them for the meeting.',
  ];

  return {
    id: id,
    sendName: sendNames[id % sendNames.length],
    message: messages[id % messages.length],
    sentDateTime: new Date().toISOString(),
    imageUrl: `image1.png`,
  };
}

self.addEventListener('message', (event: any) => {
  const { action, chunk, chunkSize } = event.data as MessageRequest;

  if (
    action === 'requestData' &&
    chunk !== undefined &&
    chunkSize !== undefined
  ) {
    const response: MessageData[] = [];
    const startIndex = chunk * chunkSize;
    const endIndex = startIndex + chunkSize;
    for (let i = startIndex; i < endIndex; i++) {
      response.push(generateMessage(i + 1));
    }
    postMessage(JSON.stringify(response));
  }
});
