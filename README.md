# Who, When, and Why (ONY)
This is a quip Live App that helps document authors to add basic information to the top of their documents in order to reduce document rot. In technology our documents tend to get out of date quickly as we are always innovating. Adding the author(s), the month and year when the doc was created, and why the doc was created help readers quickly understand the value of the document.

## Usage
In a Quip document simply type @ONY and use the Live App!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js and npm](https://nodejs.org/en/download/) (npm comes with Node.js)
- OpenSSL for creating a self-signed SSL certificate (usually pre-installed on macOS and Linux, [Windows version available here](https://slproweb.com/products/Win32OpenSSL.html))

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:
   ```bash
   git clone https://yourprojectrepository.com
   ```
2. Navigate to the project directory:
   ```bash
   cd your-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

This project includes several scripts for common tasks:

- `npm run build`: Bundles the app into static files for production.
- `npm start`: Runs the app in the development mode.
- `npm run watch`: Watches for changes and rebuilds the app automatically.

### Creating a Self-Signed SSL Certificate

To use HTTPS in local development, you need to create a self-signed SSL certificate:

1. Generate a private key and certificate:
   ```bash
   openssl genrsa -out key.pem
   openssl req -new -key key.pem -out csr.pem
   openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
   rm csr.pem
   ```
2. The above commands will create `key.pem` and `cert.pem` in your project directory. These should be excluded from version control (already added to `.gitignore`).

### Using the Local Development Server

To start a local development server:

- Run `npm start`. This will start a server with HTTPS enabled at `https://localhost:8080`.
- Due to the self-signed certificate, browsers will show a security warning. Proceed with the exception for local testing.

## Contributing

Instructions on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
