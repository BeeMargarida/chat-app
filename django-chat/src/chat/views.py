from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from .models import Chat, Contact

User = get_user_model()

def get_last_10_messages(chatID):
    chat = get_object_or_404(Chat, id=chatID)
    return chat.messages.order_by('-timestamp').all()[:10]

def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)

def get_current_chat(chatID):
    return get_object_or_404(Chat, id=chatID)