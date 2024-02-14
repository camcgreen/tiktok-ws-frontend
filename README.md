# Project Set Up

## Download the zip from GitHub

Download the ZIP of the project from this [repository](https://github.com/camcgreen/tiktok-ws-frontend).

## Ensure Node and NPM are installed

The server runs on Node. Download the most recent LTS version [here](https://nodejs.org/en).

Once installed, run the following commands in your terminal to verify:

    node -v
    npm -v

## Install the dependencies

Open the terminal and cd to where you have unzipped the project. Run the following command in your terminal:

    npm install

## Create the .env.local file

Create a file in the **root** directory of your project called _.env.local_.

In this file, add the following, replacing ${LOCAL_NETWORK_IP} for the value found in your network settings:

    NEXT_PUBLIC_WS_URL=ws://${LOCAL_NETWORK_IP}:3001

## Edit the batch script

Locate the batch script in the root directory of the project: _setup.bat_.

Right click the file and select 'Edit'. Replace the path in the script with the path to the project folder on this computer and then save the amended file.

Create a shortcut to this script on the desktop so that non-technical staff can run the app.

## Run the local Next server

Double click the shortcut you have created on the desktop to run the Next server.

You can now access the home page of the app on http://localhost:3000.

You can access the input page of the app from the Surface Pro on http://${LOCAL_NETWORK_IP}:3000.
