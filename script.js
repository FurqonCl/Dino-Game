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
        player.style.bottom = "100px"; // Lompatan
        setTimeout(() => {
            player.style.bottom = "10px"; // Kembali ke posisi awal
            isJumping = false;
        }, 300); // Durasi lompatan
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
            obstacle.style.right = "0px"; // Kembali ke posisi awal
            score++;
            scoreDisplay.innerText = "Score: " + score; // Update skor
            obstacleSpeed += 0.5; // Meningkatkan kecepatan setiap kali rintangan melintasi layar
        }
    }, 50); // Interval gerakan
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
        bullet.style.display = "block"; // Tampilkan peluru
        bullet.style.left = "80px"; // Posisi awal peluru

        const moveBullet = setInterval(() => {
            let bulletPosition = parseInt(bullet.style.left);
            bullet.style.left = bulletPosition + 10 + "px"; // Gerakan peluru ke kanan

            // Deteksi tabrakan antara peluru dan rintangan
            if (detectCollision(bullet, obstacle)) {
                obstacle.style.right = "0px"; // Reset rintangan
                bullet.style.display = "none"; // Sembunyikan peluru
                score += 5; // Tambah skor
                scoreDisplay.innerText = "Score: " + score; // Update skor
                clearInterval(moveBullet);
                isShooting = false;
            }

            if (bulletPosition >= 600) { // Jika peluru keluar dari layar
                bullet.style.display = "none"; // Sembunyikan peluru
                clearInterval(moveBullet);
                isShooting = false;
            }
        }, 20); // Kecepatan peluru
    }
}

// Fungsi untuk mereset permainan
function resetGame() {
    score = 0; // Reset skor
    obstacleSpeed = 5; // Reset kecepatan rintangan
    scoreDisplay.innerText = "Score: " + score; // Update tampilan skor
    obstacle.style.right = "0px"; // Reset posisi rintangan
}

// Event listener untuk tombol lompat dan menembak
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump(); // Tombol spasi untuk melompat
});

shootButton.addEventListener("click", shoot); // Tombol tembak

// Mulai gerakan rintangan
startObstacleMovement();
    
