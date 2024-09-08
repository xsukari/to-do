# 2024-09-08 - DEVELOPMENT WILL RESUME SHORTLY, I was working on other projects, mostly some IRL DIY things

# THIS PROJECT IS STILL HEAVILY WIP

## About this project

- Self hosted web app to track tasks / to-dos.

- Intended for a low user count, pretty much only meant for family + friends of the host, so maybe like 20 users at most, might work for more.

- Uses postgresql to store all data in database, might support other databases later (don't expect it will).

- Sends emails for invitations to an instance, registrations.

- Reminders will be implemented using a separate service: to-do-service-rust or to-do-service-python. Currently I leaning towards using Rust.

- Web app will send an update request to the service when new to-dos are created, that way the service is aware of any new reminders. Though it will be able to just get data from database itself.

- By default it will use a mail transfer agent / an smtp server (postfix in my case) hosted on the same server. If you want to use a service instead (sendgrid, etc.), you'll have to adjust the code, but I'll try to make it as accessible as possible. Reading a little bit of documentation will probably be needed, but I'll link to it here.

## Preview

![Preview](preview.jpg?raw=true "Preview")

## Limitations
- This project uses pnpm. You need to have it set up already.

- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Google Fonts.

## Getting Started
1. Install dependencies with "pnpm install".
2. Run the development server with "pnpm dev".
3. Open [http://localhost:8010](http://localhost:8010) with your browser.
