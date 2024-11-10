import { Client, StatusOK } from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new Client();
client.load(['definitions'], 'Protos/greet.proto');

export default () => {
  client.connect('localhost:5001', {});

  const data = { name: 'BjArTwOlF' };
  const response = client.invoke('greet.Greeter/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
};

export let options = {
  vus: 10,
  duration: "5s",
  rps: 250, //max requests per second, increase to go faster
}
