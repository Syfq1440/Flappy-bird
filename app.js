document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    // bird position + gravity
    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    //game timer
    let gameTimeId = setInterval(startGame, 20)

    //jump function with "spcabar"
    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    } 
    // use console.log(birdbottom) to check the max heigh
    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'  
    }
    document.addEventListener('keyup', control)

    //if (!isGameOver) will stop generate pipe
    function generateObstacle() {
        //generate green pipe
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        //moving pipe function
        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            //make pipe disappear at the end
            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            //deathbox ground and pipe
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom  < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) ||
                birdBottom === 0 
                ) {
                gameOver()
                //this code stop everything if bird hit obstacle
                clearInterval(timerId)
            }

        }
        let timerId = setInterval(moveObstacle, 20)
        //this code generated pipe every 3s
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    //when you die this will stop player movement and bird 
    function gameOver() {
        clearInterval(gameTimeId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

})