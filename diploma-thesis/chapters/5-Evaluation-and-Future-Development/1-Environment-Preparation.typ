== Environment Preparation

WordPress is one of the easiest and most popular ways to create a website. 
It's an optimal choice for several reasons: it offers plugins for creating mock data, provides tools that improve metrics with a single click, allows for easy upgrades (even through major versions), and has docker images available dating back several years.

We will create three exact copies of a website with the same content; one will stay at the old version, the remaining two will be upgraded to the latest version, and one of them will have some plugins installed.
The setup will be done via docker-compose, a tool for multiple docker container management.
The shortened version of the docker-compose file can be seen in @wordpress-compose.
They share the database, only differentiating by table prefix, and they share the wp-content directory, so uploaded images are accessible to all instances.

#figure(
  caption: "WordPress setup", 
  supplement: "Code", 
  kind: "code", 
  [
    ```yaml
services:
  db:
    image: mariadb:10.6.4-focal
    command: "--default-authentication-plugin=mysql_native_password"
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    ports:
      - 3306:3306
  wordpress-new-upgrade:
    image: wordpress:5.5.0-php7.4-apache
    ports:
      - 83:80
    restart: always
    environment:
      - WORDPRESS_TABLE_PREFIX=new_upgrade_
    volumes:
      - wp-content:/var/www/html/wp-content
  wordpress-new:
  // same as wordpress-new-upgrade
    ports:
      - 81:80
    environment:
      - WORDPRESS_TABLE_PREFIX=new_
  wordpress-old:
  // same as wordpress-new-upgrade
    ports:
      - 82:80
    environment:
      - WORDPRESS_TABLE_PREFIX=old_
volumes:
  db_data:
  wp-content:
    ```
  ]
) <wordpress-compose>

After creating instances, we can fill in the data.
For that, we can use the FakerPress extension, which creates tags, users, posts, pages and comments.
For this comparison, 20 users, 40 posts and pages and 60 comments should be sufficient.

This is created on the wordpress-old instance; the data are then dumped using the mariadb-dump command, the `old_` prefix is changed for `new_` and is imported back to the database.
The same goes for the wordpress-new-upgrade instance.
This way, all of the instances share the exact same data, only differing in the title, which we set separately.

For the instance with plugins we can install several extensions, picking the most downloaded for each category.
Those plugins are Ally - Web Accessibility & Usability for accessibility, LiteSpeed Cache for performance, Really Simple Security for security and Yoast SEO for search engine optimisation.
All of the plugins were just activated and set up with the default values.
