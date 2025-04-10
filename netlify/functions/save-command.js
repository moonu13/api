export async function handler(event, context) {
  const fs = await import('fs/promises');
  const filePath = '/tmp/command.txt';

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      if (!data.command) {
        return {
          statusCode: 400,
          body: 'missing command nya~ ;_;',
        };
      }

      await fs.writeFile(filePath, data.command, 'utf8');
      return {
        statusCode: 200,
        body: 'command saved nya! 🐾',
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: 'meowie error: ' + err.message,
      };
    }
  }

  if (event.httpMethod === 'GET') {
    try {
      const command = await fs.readFile(filePath, 'utf8');
      return {
        statusCode: 200,
        body: command,
      };
    } catch (err) {
      return {
        statusCode: 404,
        body: 'no command saved yet meow~ >_<',
      };
    }
  }

  return {
    statusCode: 405,
    body: 'method not allowed nya~',
  };
}
