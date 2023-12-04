# Web Audit Tool

This tool aims to help developers and designers to audit their web applications and websites.
It will provide a list of issues and suggestions to improve the performance, accessibility, and SEO of the website.

## Structure

This project is a monorepo, using [Turborepo](https://turbo.build/repo/docs/).
App folder contains all applications, for now there is only one Next.js app.
Packages folder contains internal packages.
Packages with `config` suffix are configuration packages, they are used to share configuration between apps to keep code consistent.
Packages with `module` suffix contains Audit modules, they are used to audit the website.
Icons and UI are reexported MUI components as well as some custom ones.
