from rest_framework import serializers
from chat.views import get_user_contact
from chat.models import Chat, Contact


class ContactSerialzer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ChatSerializer(serializers.ModelSerializer):

    participants = ContactSerialzer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')

    def create(self, validated_data):
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat