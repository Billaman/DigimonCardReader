
window.onload=function(){
const player = document.getElementById('player')
const snapshotZone = document.getElementById('snapshot')
const captureButton = document.getElementById('capture')
const result = document.getElementById('result')

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  player.srcObject = stream
})

captureButton.addEventListener('click', function() {
  result.value = "loading...";
  const context = snapshot.getContext('2d')
  context.drawImage(player, 0, 0, snapshotZone.width, snapshotZone.height)
  // Tesseract.recognize(snapshotZone, 'jpn', { logger: m => console.log(m) }) // 日本語
  Tesseract.recognize(snapshotZone, 'eng', { logger: m => console.log(m) })
  .then(({ data: { words } }) => {
    var arrayLength = words.length;
    for (var i = 0; i < arrayLength; i++) {
      console.log(words[i].text)
     if (words[i].text.includes('-') && words[i].text.length >2 )
      result.value = words[i].text
     //Do something
     if (i ==  arrayLength-1 && result.value =="loading...")
        result.value = "No Cardnumber found!"
    }
  })
})
}
