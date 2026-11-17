// RPG Game Engine Full HD (1920x1080)
// Renderização em tela cheia com tiles de 64px, movimentação fluida,
// detecção de colisão, suporte a clique/touch e marcadores visuais vibrantes.

class RPGEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        // Resolução Nativa Full HD 1080p
        this.canvas.width = 1920;
        this.canvas.height = 1080;

        this.tileSize = 64;
        this.mapCols = 30; // 30 * 64 = 1920
        this.mapRows = 17; // 17 * 64 = 1088 (cobre os 1080p)

        // Estado do Jogador
        this.player = {
            x: 4,
            y: 9,
            pxX: 4 * 64,
            pxY: 9 * 64,
            targetPxX: 4 * 64,
            targetPxY: 9 * 64,
            dir: "down",
            speed: 5.5,
            isMoving: false,
            animStep: 0,
            stepTimer: 0
        };

        this.keys = {};
        this.activeTurma = null;
        this.currentMissaoIndex = 0;
        this.isModalOpen = false;

        // Mapa Full HD (30 colunas x 17 linhas)
        // 0=Grama, 1=Calçada/Pedra, 2=Asfalto/Pista, 3=Parede, 4=Telhado, 5=Água, 6=Árvore, 7=Cerca, 8=Flores, 9=Antena/Mastro
        this.map = [
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,0,0,0,0,0,6,0,0,0,0,0,6,0,0,0,0,0,6,0,0,0,0,0,6,0,0,0,0,6],
            [6,0,4,4,4,0,0,4,4,4,0,0,1,0,4,4,4,0,0,4,4,4,0,0,1,0,4,4,0,6],
            [6,0,3,3,3,0,0,3,3,3,0,0,1,0,3,3,3,0,0,3,3,3,0,0,1,0,3,3,0,6],
            [6,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,6],
            [6,0,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,0,6],
            [6,0,1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,0,6],
            [6,0,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,6],
            [6,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,6],
            [6,0,0,0,8,8,1,1,0,5,5,0,1,1,0,5,5,0,1,1,0,8,8,0,1,1,0,0,0,6],
            [6,0,0,0,8,8,1,1,0,5,5,0,1,1,0,5,5,0,1,1,0,8,8,0,1,1,4,4,4,6],
            [6,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,3,3,3,6],
            [6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
            [6,0,0,4,4,4,1,1,0,4,4,4,4,4,1,1,0,4,4,4,1,1,0,0,0,0,0,0,0,6],
            [6,0,0,3,3,3,1,1,0,3,3,3,3,3,1,1,0,3,3,3,1,1,0,0,0,0,0,0,0,6],
            [6,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ];

        this.collisionMap = [];
        this.initCollision();
        this.initInput();

        this.animPulse = 0;
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    initCollision() {
        for (let r = 0; r < this.mapRows; r++) {
            this.collisionMap[r] = [];
            for (let c = 0; c < this.mapCols; c++) {
                const tile = this.map[r][c];
                // Bloqueia paredes (3), telhados (4), água (5), árvores (6)
                this.collisionMap[r][c] = (tile === 3 || tile === 4 || tile === 5 || tile === 6);
            }
        }
    }

    initInput() {
        window.addEventListener("keydown", (e) => {
            if (this.isModalOpen) return;
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === " " || e.key.toLowerCase() === "e" || e.key === "Enter") {
                this.checkInteraction();
            }
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
            // Ao soltar a tecla, o destino do jogador permanece exatamente onde ele parou
            this.player.targetPxX = this.player.pxX;
            this.player.targetPxY = this.player.pxY;
        });

        // Clique ou Toque no Canvas Full HD para caminhar
        this.canvas.addEventListener("pointerdown", (e) => {
            if (this.isModalOpen) return;
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            const targetTileX = Math.floor(clickX / this.tileSize);
            const targetTileY = Math.floor(clickY / this.tileSize);

            this.movePlayerTowards(targetTileX, targetTileY);
        });
    }

    setTurma(turmaData) {
        this.activeTurma = turmaData;
        this.currentMissaoIndex = 0;
        this.player.x = turmaData.playerSpawn.x;
        this.player.y = turmaData.playerSpawn.y;
        this.player.pxX = this.player.x * this.tileSize;
        this.player.pxY = this.player.y * this.tileSize;
        this.player.targetPxX = this.player.pxX;
        this.player.targetPxY = this.player.pxY;
        this.updateHUD();
    }

    getCurrentMissao() {
        if (!this.activeTurma) return null;
        return this.activeTurma.missoes[this.currentMissaoIndex] || null;
    }

    advanceMissao() {
        if (!this.activeTurma) return;
        this.currentMissaoIndex++;
        if (this.currentMissaoIndex >= this.activeTurma.missoes.length) {
            window.uiManager.showVictoryScreen(this.activeTurma);
        } else {
            this.updateHUD();
        }
    }

    updateHUD() {
        const missao = this.getCurrentMissao();
        const hudTitle = document.getElementById("hudMissaoTitulo");
        const hudResumo = document.getElementById("hudMissaoResumo");
        const hudIcon = document.getElementById("hudMissaoIcon");

        if (missao && hudTitle && hudResumo) {
            hudTitle.innerText = missao.titulo;
            hudResumo.innerText = `🎯 ${missao.resumo} (${missao.npc} em ${missao.local})`;
            if (hudIcon) hudIcon.innerText = missao.icone;
        }
    }

    movePlayerTowards(tileX, tileY) {
        if (tileX < 0 || tileX >= this.mapCols || tileY < 0 || tileY >= this.mapRows) return;
        if (this.collisionMap[tileY][tileX]) return;

        this.player.targetPxX = tileX * this.tileSize;
        this.player.targetPxY = tileY * this.tileSize;
    }

    updatePlayer() {
        if (this.isModalOpen) return;

        let dx = 0;
        let dy = 0;

        if (this.keys["arrowup"] || this.keys["w"]) {
            dy -= this.player.speed;
            this.player.dir = "up";
        }
        if (this.keys["arrowdown"] || this.keys["s"]) {
            dy += this.player.speed;
            this.player.dir = "down";
        }
        if (this.keys["arrowleft"] || this.keys["a"]) {
            dx -= this.player.speed;
            this.player.dir = "left";
        }
        if (this.keys["arrowright"] || this.keys["d"]) {
            dx += this.player.speed;
            this.player.dir = "right";
        }

        // Se está se movendo pelo teclado, sincroniza o destino para a posição atual
        if (dx !== 0 || dy !== 0) {
            this.player.targetPxX = this.player.pxX;
            this.player.targetPxY = this.player.pxY;
        } else {
            // Destino suave por clique (somente quando nenhuma tecla estiver pressionada)
            const distX = this.player.targetPxX - this.player.pxX;
            const distY = this.player.targetPxY - this.player.pxY;
            if (Math.abs(distX) > 3) {
                dx = Math.sign(distX) * Math.min(this.player.speed, Math.abs(distX));
                this.player.dir = dx > 0 ? "right" : "left";
            }
            if (Math.abs(distY) > 3) {
                dy = Math.sign(distY) * Math.min(this.player.speed, Math.abs(distY));
                this.player.dir = dy > 0 ? "down" : "up";
            }
        }

        if (dx !== 0 || dy !== 0) {
            this.player.isMoving = true;

            const newPxX = this.player.pxX + dx;
            const newPxY = this.player.pxY + dy;

            // Bounding box do personagem (36x48 centralizado no tile de 64px)
            const tileLeft = Math.floor((newPxX + 14) / this.tileSize);
            const tileRight = Math.floor((newPxX + 50) / this.tileSize);
            const tileTop = Math.floor((newPxY + 28) / this.tileSize);
            const tileBottom = Math.floor((newPxY + 60) / this.tileSize);

            const isBlockedX = this.isTileBlocked(tileLeft, Math.floor((this.player.pxY + 44) / this.tileSize)) ||
                               this.isTileBlocked(tileRight, Math.floor((this.player.pxY + 44) / this.tileSize));

            const isBlockedY = this.isTileBlocked(Math.floor((this.player.pxX + 32) / this.tileSize), tileTop) ||
                               this.isTileBlocked(Math.floor((this.player.pxX + 32) / this.tileSize), tileBottom);

            if (!isBlockedX) this.player.pxX = newPxX;
            if (!isBlockedY) this.player.pxY = newPxY;

            this.player.x = Math.round(this.player.pxX / this.tileSize);
            this.player.y = Math.round(this.player.pxY / this.tileSize);

            this.player.stepTimer++;
            if (this.player.stepTimer > 8) {
                this.player.stepTimer = 0;
                this.player.animStep = (this.player.animStep + 1) % 4;
                if (window.soundEngine && (this.player.animStep === 0 || this.player.animStep === 2)) {
                    window.soundEngine.playStep();
                }
            }
        } else {
            this.player.isMoving = false;
            this.player.animStep = 0;
        }
    }

    isTileBlocked(c, r) {
        if (c < 0 || c >= this.mapCols || r < 0 || r >= this.mapRows) return true;
        return this.collisionMap[r][c] === true;
    }

    checkInteraction() {
        const missao = this.getCurrentMissao();
        if (!missao) return;

        const targetX = missao.posTarget.x * this.tileSize;
        const targetY = missao.posTarget.y * this.tileSize;

        const dist = Math.hypot(this.player.pxX - targetX, this.player.pxY - targetY);

        if (dist <= this.tileSize * 2.2) {
            if (window.soundEngine) window.soundEngine.playSelect();
            window.uiManager.openMissionModal(missao);
        }
    }

    drawMap() {
        const ts = this.tileSize;

        for (let r = 0; r < this.mapRows; r++) {
            for (let c = 0; c < this.mapCols; c++) {
                const tile = this.map[r][c];
                const px = c * ts;
                const py = r * ts;

                switch (tile) {
                    case 0: // Grama Suave Stardew
                        this.ctx.fillStyle = "#4ade80";
                        this.ctx.fillRect(px, py, ts, ts);
                        this.ctx.fillStyle = "#22c55e";
                        this.ctx.fillRect(px + 10, py + 12, 4, 8);
                        this.ctx.fillRect(px + 40, py + 42, 4, 8);
                        break;
                    case 1: // Calçada de Pedra com Textura
                        this.ctx.fillStyle = "#cbd5e1";
                        this.ctx.fillRect(px, py, ts, ts);
                        this.ctx.strokeStyle = "#94a3b8";
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeRect(px + 2, py + 2, ts - 4, ts - 4);
                        break;
                    case 2: // Pista de Asfalto com Faixa Amarela Central
                        this.ctx.fillStyle = "#334155";
                        this.ctx.fillRect(px, py, ts, ts);
                        if (c % 2 === 0) {
                            this.ctx.fillStyle = "#fbbf24";
                            this.ctx.fillRect(px + 16, py + ts / 2 - 4, 28, 8);
                        }
                        break;
                    case 3: // Parede de Tijolo
                        this.ctx.fillStyle = "#b45309";
                        this.ctx.fillRect(px, py, ts, ts);
                        this.ctx.strokeStyle = "#78350f";
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeRect(px, py, ts, ts);
                        this.ctx.fillStyle = "#fef08a"; // Janela iluminada
                        this.ctx.fillRect(px + 16, py + 14, 32, 32);
                        break;
                    case 4: // Telhado Rústico de Madeira
                        this.ctx.fillStyle = "#9a3412";
                        this.ctx.fillRect(px, py, ts, ts);
                        this.ctx.fillStyle = "#c2410c";
                        this.ctx.fillRect(px, py + 8, ts, 12);
                        break;
                    case 5: // Chafariz / Água Azul
                        this.ctx.fillStyle = "#38bdf8";
                        this.ctx.fillRect(px, py, ts, ts);
                        this.ctx.fillStyle = "#0284c7";
                        this.ctx.fillRect(px + 10, py + 10, ts - 20, ts - 20);
                        break;
                    case 6: // Árvore Verde Frondosa
                        this.ctx.fillStyle = "#15803d";
                        this.ctx.beginPath();
                        this.ctx.arc(px + ts / 2, py + ts / 2 - 8, ts / 2, 0, Math.PI * 2);
                        this.ctx.fill();
                        this.ctx.fillStyle = "#78350f";
                        this.ctx.fillRect(px + ts / 2 - 6, py + ts - 16, 12, 16);
                        break;
                    case 8: // Canteiro de Flores Coloridas
                        this.ctx.fillStyle = "#86efac";
                        this.ctx.fillRect(px, py, ts, ts);
                        this.ctx.fillStyle = "#f43f5e";
                        this.ctx.beginPath();
                        this.ctx.arc(px + 20, py + 24, 8, 0, Math.PI * 2);
                        this.ctx.arc(px + 44, py + 40, 8, 0, Math.PI * 2);
                        this.ctx.fill();
                        break;
                    default:
                        this.ctx.fillStyle = "#22c55e";
                        this.ctx.fillRect(px, py, ts, ts);
                }
            }
        }
    }

    drawTargetObjective() {
        const missao = this.getCurrentMissao();
        if (!missao) return;

        const ts = this.tileSize;
        const tx = missao.posTarget.x * ts + ts / 2;
        const ty = missao.posTarget.y * ts + ts / 2;

        this.animPulse = (this.animPulse + 0.05) % (Math.PI * 2);
        const pulseR = 34 + Math.sin(this.animPulse) * 8;

        // Círculo Dourado Pulsante
        this.ctx.strokeStyle = "rgba(251, 191, 36, 0.9)";
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(tx, ty, pulseR, 0, Math.PI * 2);
        this.ctx.stroke();

        // Balão de Atenção [ ! ]
        this.ctx.fillStyle = "#f59e0b";
        this.ctx.beginPath();
        this.ctx.arc(tx, ty - 48, 20, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 22px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("!", tx, ty - 40);

        // Placa com Nome do NPC / Local
        this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        this.ctx.fillRect(tx - 110, ty - 92, 220, 32);
        this.ctx.strokeStyle = "#fbbf24";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(tx - 110, ty - 92, 220, 32);

        this.ctx.fillStyle = "#fef08a";
        this.ctx.font = "bold 15px sans-serif";
        this.ctx.fillText(`${missao.icone} ${missao.npc.split(" ")[0]}`, tx, ty - 70);

        // Aviso de Proximidade para Pressionar Espaço
        const dist = Math.hypot(this.player.pxX - (tx - ts / 2), this.player.pxY - (ty - ts / 2));
        if (dist <= ts * 2.2) {
            this.ctx.fillStyle = "#facc15";
            this.ctx.fillRect(this.player.pxX - 60, this.player.pxY - 46, 184, 34);
            this.ctx.strokeStyle = "#b45309";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(this.player.pxX - 60, this.player.pxY - 46, 184, 34);

            this.ctx.fillStyle = "#78350f";
            this.ctx.font = "bold 15px sans-serif";
            this.ctx.fillText("[ ESPAÇO ] Conversar", this.player.pxX + 32, this.player.pxY - 24);
        }
    }

    drawPlayer() {
        const px = this.player.pxX;
        const py = this.player.pxY;
        const bounce = (this.player.isMoving && (this.player.animStep === 1 || this.player.animStep === 3)) ? -4 : 0;

        // Sombra sob os pés
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        this.ctx.beginPath();
        this.ctx.ellipse(px + 32, py + 56, 20, 10, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Calça Jeans
        this.ctx.fillStyle = "#1e3a8a";
        this.ctx.fillRect(px + 20, py + 36 + bounce, 24, 20);

        // Camisa Vermelha (Stardew Style)
        this.ctx.fillStyle = "#ef4444";
        this.ctx.fillRect(px + 16, py + 20 + bounce, 32, 20);

        // Rosto
        this.ctx.fillStyle = "#fcd34d";
        this.ctx.fillRect(px + 18, py + 4 + bounce, 28, 18);

        // Cabelo Castanho
        this.ctx.fillStyle = "#78350f";
        this.ctx.fillRect(px + 16, py + bounce, 32, 8);
        if (this.player.dir === "left") {
            this.ctx.fillRect(px + 14, py + 4 + bounce, 8, 12);
        } else if (this.player.dir === "right") {
            this.ctx.fillRect(px + 42, py + 4 + bounce, 8, 12);
        }

        // Olhos
        if (this.player.dir !== "up") {
            this.ctx.fillStyle = "#0f172a";
            if (this.player.dir === "down") {
                this.ctx.fillRect(px + 22, py + 12 + bounce, 4, 4);
                this.ctx.fillRect(px + 38, py + 12 + bounce, 4, 4);
            } else if (this.player.dir === "left") {
                this.ctx.fillRect(px + 20, py + 12 + bounce, 4, 4);
            } else if (this.player.dir === "right") {
                this.ctx.fillRect(px + 40, py + 12 + bounce, 4, 4);
            }
        }
    }

    loop() {
        this.updatePlayer();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.drawTargetObjective();
        this.drawPlayer();

        requestAnimationFrame(this.loop);
    }
}

window.RPGEngine = RPGEngine;
