const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 9, y: 9 }];
let direction = { x: 1, y: 0 };
let food = randomFood();
let playing = true;

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowUp":
			if (direction.y === 1) break;
			direction = { x: 0, y: -1 };
			break;
		case "ArrowDown":
			if (direction.y === -1) break;
			direction = { x: 0, y: 1 };
			break;
		case "ArrowLeft":
			if (direction.x === 1) break;
			direction = { x: -1, y: 0 };
			break;
		case "ArrowRight":
			if (direction.x === -1) break;
			direction = { x: 1, y: 0 };
			break;
	}
});

function randomFood () {
	return {
		x: Math.floor(Math.random() * (canvas.width / grid)),
		y: Math.floor(Math.random() * (canvas.height / grid))
	};
}

function gameLoop () {
	if (!playing) return;

	const head = {
		x: snake[0].x + direction.x,
		y: snake[0].y + direction.y
	};

	// collision with walls
	if (
		head.x < 0
		|| head.x >= canvas.width / grid
		|| head.y < 0
		|| head.y >= canvas.height / grid
		|| snake.some((segment) => segment.x === head.x && segment.y === head.y)
	) {
		playing = false;
		alert("Game Over");
		return;
	}

	snake.unshift(head);

	// eating food
	if (head.x === food.x && head.y === food.y) {
		food = randomFood();
	} else {
		snake.pop();
	}

	draw();
}

function draw () {
	ctx.fillStyle = "#111";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "lime";
	snake.forEach((segment) => {
		ctx.fillRect(
			segment.x * grid + 1,
			segment.y * grid + 1,
			grid - 2,
			grid - 2
		);
	});

	ctx.fillStyle = "red";
	ctx.fillRect(food.x * grid + 1, food.y * grid + 1, grid - 2, grid - 2);
}

setInterval(gameLoop, 100);
