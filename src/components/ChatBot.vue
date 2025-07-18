<template>
  <Chat
    :chat="chatMessages"
    :onSend="handleMessage"
    :bgColorHeader="'#519171'"
    :textColorHeader="'#ffffff'"
    :inputPlaceholder="'Scrivi a GAL...'"
    :offline="false"
    :height="'85vh'"
    :textColorInput="'#519171'"
    :bgColorIcon="'#967147'"
    :bgColorMessagePerson="'#519171'"
  />
</template>

<script setup>
import { Chat } from '@chat-ui/vue3'
import { ref } from 'vue'
import { getSmartReply } from './smartReply'

// Lista reattiva dei messaggi
const chatMessages = ref([
  {
    message: 'Ciao, sono GAL, la tua guida nel territorio delle Valli del Golfo! Come posso aiutarti?',
    type: 'chatbot'
  }
])

function handleMessage(userMsg) {
  if (!userMsg) return

  chatMessages.value.push({
    message: userMsg,
    type: 'person',
    timestamp: new Date().toLocaleTimeString()
  })

  setTimeout(() => {
    const reply = getSmartReply(userMsg)
    chatMessages.value.push({
      message: reply,
      type: 'chatbot',
      timestamp: new Date().toLocaleTimeString()
    })
  }, 800)
}
</script>

<style scoped>
</style>
