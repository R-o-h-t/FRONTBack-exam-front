const backendUrl = 'http://localhost:8000';

interface Query {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: any;
}

const query = (query: Query, token: string) => {
  return new Promise<{ data: any }>(async (resolve, reject) => {
    try {
      await fetch(`${backendUrl}${query.url}`, {
        method: query.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: query.body ? JSON.stringify(query.body) : undefined
      })
        .then((response) => response.json())
        .then((d) => {
          console.log(d);
          resolve({ data: d });
        })
        .catch((e) => {
          reject(e);
        });
    } catch (error) {
      console.log(error);
    }
  });
};

export default query;

export { backendUrl };
