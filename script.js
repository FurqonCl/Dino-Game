const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const bullet = document.getElementById("bullet");
const shootButton = document.getElementById("shootButton");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let isShooting = false;
let score = 0;
let obstacleSpeed = 5;

// Fungsi untuk melompat
function jump() {
    if (!isJumping) {
        isJumping = true;
        player.style.bottom = "100px";
        setTimeout(() => {
            player.style.bottom = "10px";
            isJumping = false;
        }, 300);
    }
}

// Fungsi untuk memulai gerakan rintangan
function startObstacleMovement() {
    obstacle.style.right = "0px";
    const moveObstacle = setInterval(() => {
        let obstaclePosition = parseInt(obstacle.style.right);
        obstacle.style.right = obstaclePosition + obstacleSpeed + "px";

        // Deteksi tabrakan
        if (detectCollision(player, obstacle)) {
            alert("Game Over! Skor Akhir: " + score);
            resetGame();
            clearInterval(moveObstacle);
        }

        // Reset posisi rintangan
        if (obstaclePosition >= 600) {
            obstacle.style.right = "0px";
            score++;
            scoreDisplay.innerText = "Score: " + score;
            obstacleSpeed += 0.5; // Meningkatkan kecepatan setiap kali rintangan melintasi layar
        }
    }, 50);
}

// Fungsi deteksi tabrakan
function detectCollision(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
        playerRect.top > obstacleRect.bottom ||
        playerRect.bottom < obstacleRect.top ||
        playerRect.left > obstacleRect.right ||
        playerRect.right < obstacleRect.left
    );
}

// Fungsi menembak
function shoot() {
    if (!isShooting) {
        isShooting = true;
        bullet.style.display = "block";
        bullet.style.left = "80px";

        const moveBullet = setInterval(() => {
            let bulletPosition = parseInt(bullet.style.left);
            bullet.style.left = bulletPosition + 10 + "px";

            // Deteksi tabrakan antara peluru dan rintangan
            if (detectCollision(bullet, obstacle)) {
                obstacle.style.right = "0px";
                bullet.style.display = "none";
                score += 5; // Tambah skor jika menembak rintangan
                scoreDisplay.innerText = "Score: " + score;
                clearInterval(moveBullet);
                isShooting = false;
            }

            if (bulletPosition >= 600) {
                bullet.style.display = "none";
                clearInterval(moveBullet);
                isShooting = false;
            }
        }, 20);
    }
}

// Fungsi untuk mereset permainan
function resetGame() {
    score = 0;
    obstacleSpeed = 5;
    scoreDisplay.innerText = "Score: " + score;
    obstacle.style.right = "0px";
}

// Event listener untuk tombol lompat dan menembak
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

shootButton.addEventListener("click", shoot);

// Mulai gerakan rintangan
startObstacleMovement();
                
