export function StupidRandomizer(onGameDone: any) {
    console.log('Game started');
    
    const content = document.createElement('div');
    content.innerHTML = `
        <h1>Stupid Randomizer</h1>
        <p>Click the button to see if you win!</p>
        
    `;
    const button = document.createElement('button');
    button.id = 'randomizerButton';
    button.innerText = 'Randomize';
    button.onclick = () => {
        console.log('Button clicked');
        content.innerHTML = `
            <h1>Stupid Randomizer</h1>
            <p>Calculating...</p>
        `;
        setTimeout(() => {
            console.log('Game done');
            const score = Math.floor(Math.random() * 100);
            console.log('Score:', score);
            if(score > 90) {
                onGameDone(true);
                return;
            }
            onGameDone(false);
        }, 500);
    };
    content.appendChild(button);
    return content;
}