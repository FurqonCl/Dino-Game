const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const bullet = document.getElementById("bullet");
const shootButton = document.getElementById("shootButton");

let isJumping = false;
let isShooting = false;
let isInvincible = false;

// Fungsi untuk melompat
function jump() {
    if (!isJumping) {
        isJumping = true;
        player.style.bottom = "100px";
        setTimeout(() => {
            player.style.bottom = "10px";
            setTimeout(() => {
                isJumping = false;
            }, 300);
        }, 300);
    }
}

// Fungsi untuk memulai gerakan rintangan
function startObstacleMovement() {
    obstacle.style.right = "0px";
    const moveObstacle = setInterval(() => {
        let obstaclePosition = parseInt(obstacle.style.right);
        obstacle.style.right = obstaclePosition + 5 + "px";

        // Deteksi tabrakan
        if (!isInvincible && detectCollision(player, obstacle)) {
            alert("Game Over!");
            obstacle.style.right = "0px";
            clearInterval(moveObstacle);
        }

        // Reset posisi rintangan
        if (obstaclePosition >= 600) {
            obstacle.style.right = "0px";
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

// Fungsi kebal
function toggleInvincibility() {
    isInvincible = !isInvincible;
    player.style.backgroundColor = isInvincible ? "#00FF00" : "#007BFF";
}

// Event listener untuk tombol lompat dan kebal
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
    if (e.code === "KeyI") toggleInvincibility();
});

shootButton.addEventListener("click", shoot);

// Mulai gerakan rintangan
startObstacleMovement();
