# Unicode URL Blocker

A browser extension to block requests which contain Unicode characters.

The extension blocks requests which contain characters which might trick you to visit another page.

Example URL:

* [https://github.com∕foo∕bar∕baz@example.com](https://github.com∕foo∕bar∕baz@example.com)
* [https://drive⡀google⡀com∕foo.example.com](https://drive⡀google⡀com∕foo.example.com)

## Build

Requirements:

* NodeJS
* npm

Install the required dependencies using `npm install`.

After that, you can build the extension using `npm run build`. Or you might use `npm run start` to build and start the extension.