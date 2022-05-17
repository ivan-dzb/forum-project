import App from './app';

const port = process.env.PORT || 3000;

App.listen(port, () => console.log(`Listening on port ${port}`));