export const textToSpeech = (text: string) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text
    window.speechSynthesis.speak(msg);
}