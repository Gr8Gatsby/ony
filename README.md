# Who, When, and Why (ONY)
This is a quip Live App that helps document authors to add basic information to the top of their documents in order to reduce document rot. In technology our documents tend to get out of date quickly as we are always innovating. Adding the author(s), the month and year when the doc was created, and why the doc was created help readers quickly understand the value of the document.

## Usage
In a Quip document simply type @ONY and use the Live App!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js and npm](https://nodejs.org/en/download/) (npm comes with Node.js)
- [mkcert](https://github.com/FiloSottile/mkcert) for creating locally-trusted development certificates

### Installing mkcert

`mkcert` is a tool that makes it simple to create locally trusted development certificates. Follow the installation instructions based on your operating system:

#### For macOS:
\```bash
brew install mkcert
brew install nss # if you use Firefox
\```

#### For Windows:
\```bash
choco install mkcert
\```
Or download from the [GitHub releases page](https://github.com/FiloSottile/mkcert/releases) and add to your PATH.

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:
   \```bash
   git clone https://yourprojectrepository.com
   \```
2. Navigate to the project directory:
   \```bash
   cd your-project
   \```
3. Install dependencies:
   \```bash
   npm install
   \```

### Development Scripts

This project includes several scripts for common tasks:

- `npm run build`: Bundles the app into static files for production.
- `npm start`: Runs the app in the development mode with HTTPS.
- `npm run watch`: Watches for changes and rebuilds the app automatically.

### Setting Up HTTPS for Local Development with mkcert

1. Install mkcert and set up the local CA:
   \```bash
   mkcert -install
   \```
2. Create a locally-trusted certificate for your development server:
   \```bash
   mkcert localhost 127.0.0.1 ::1
   \```
   This will generate `localhost+2.pem` and `localhost+2-key.pem` in your current directory.

3. Start your local development server using these certificates.

### Using the Local Development Server

To start a local development server with HTTPS:

- Run `npm start`. This will start a server with HTTPS enabled at `https://localhost:8080` using the certificates created by mkcert.

## License

This project is licensed under the [LICENSE NAME] License - see the [LICENSE.md](LICENSE.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
