# chat-app
Django API with frontend in React - Chat application

## Dependencies
* Django
* npm
* Redis

## Run

#### In **django-chat/frontend** do:

* ``` npm install ```

* ``` npm start ```

#### In **django-chat/backend** do:

* Change in **django-chat/backend/justchat/settings.py** the *CHANNEL_LAYERS* host information for the address and port of your redis service.

* ``` python manage.py migrate ```

* ``` python manage.py runserver ```
