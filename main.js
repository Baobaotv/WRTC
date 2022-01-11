console.log($);
function openStream(){
    const config={
        audio: false,
        video: true
    };
    // const a= navigator.mediaDevices.getUserMedia(config);
    // console.log(a);
    return navigator.mediaDevices.getUserMedia(config);

}
function playstream(idVideo, stream){
        const video = document.getElementById(idVideo);
        video.srcObject= stream;
        video.play();
}

// openStream().then(stream=>playstream('localStream',stream));
const peer = new Peer();
peer.on('open',id=> $('#myPeer').append(id));

//Caller
$('#btnCall').click(()=>{
        const id= $('#remoteId').val();
        openStream()
        .then(stream=>{
            playstream('localStream',stream);
            const call = peer.call(id,stream);
            call.on('stream',remoteStream=>playstream('remoteStream',remoteStream));
        })

})

//answer
peer.on('call',call=>{
    openStream()
    .then(stream=>{
        call.answer(stream);
        playstream('localStream',stream);
        call.on('stream',remoteStream=>playstream('remoteStream',remoteStream))
    })
})