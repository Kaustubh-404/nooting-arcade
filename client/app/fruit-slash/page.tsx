"use client";

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

// Define a class for our scene
class FruitSlashScene extends Phaser.Scene {
  private fruits!: Phaser.Physics.Arcade.Group;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super('FruitSlashScene');
  }

  preload() {
    // Load base64 image directly to avoid file system issues
    this.load.image('fruit', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mSkUrDnYQcchQnSyIijhqFYpQIdQKrTqYXPoPmjQkKS6OgmvBwZ/FqoOLs64OroIg+APi5uak6CIlfpcUWsR4x3EP73vvS3rvA4RGhalm1wSgapZRjsdEJrcqBF7RjSH0YgZBiZl6Ir2Qgef4uoeP73dRnuVd9+foVfImAwIi8SxTTYt4g3h609I57xOHWVlSiM+JJwx6kPiR67LHb5yLDgs8M2xk0vPEYWKx2MFyB7OSoRJPE0cUVaN8IeuywnmLs1qpsdY9+QtDeW1lmes0hxHHEhJIQoSMGsqowEKUVo0UE2naj3v4Rx2/RC6ZXGUwciygChWS4wf/g9+zNQuTE25SMAZ0vtj2xzAQ2AUaNdv+PrbtxgngfwautJa/UgdmPkmvtbTIEdC3DVxctzR5D7jcAQafdMmQHMlPSygUgPcz+qYcELoFulfduTXPcfoAZGhWSzfAwSEwWqTsNY93d7b39u+ZZv9+ALUBcsrj6BqsAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAJnKAACZygHjkaQiAAAAB3RJTUUH4wUTCCgxgiYTTQAAAptJREFUaN7tmc9rE1EQxz9Z00bSmlgDtdQ2/oh/QIsnL57FkxfBmzcPXjznDxFEehMUxItHL4J48iB4aZvU0LS0JqEmJLHJuunGu8Obnff2vSSX+cJCdmdm5/t9M7Pzw78S21jHKiLA+YFLFnxo+aYXgD6eBD4K/bMp6HrTGcG+9Nxfgcf/C4hPFuQQqEo6vaMyvApcNTXUB4y6CRKLRIQqq11gXUMYl3KHrsNZrBTsMnDGgMy+lAOoSLkoUANK+nWJ58A3bR1ZDVXgjtY+S5CZbmgeQ2CZYiM9oRgmVeC2NtC3tP+qvDYmtaSqoQPMRTSrPLZitQ3NWkS99KAZHHYQsqMmADVnbSDUv+gXKxAZXTrxJnYr6QBkJr7Qk4x1Ae47dkFO/GKRGkddgDzMtCGqK7UDAKJrh+F1pECzK2XHCUIz0gRIjW9I+XEQE5SemCDMKuIaZOTSIKi+SdtB0F5XoXnWAUjx+OPSvlJeUhOYP9JALnkAqRgzP39uaNZtQKY5tLHMsB0B8iyHQGZG9YwcpMkxkIECCZBAiXQhKo4nw4mOJr4P/PQJEvf5Jm/ZKYm8AUYLvgX8FghsO4Z5HYEUnU6vkjmYv8BT4L3QTzNHB+BbVbP0Gujn6wA8sNjraDlIS84XQGLSPGmYsukd/w44D/QKSLZXgT3tRTfNn22QCnDBcjj+MZNuuDQUZHPlCULNetvWUMVRHbYcQryxDlxJYRqDzYz/UxzjfQNE4vxTwdDnMARySgtC7XAIciQbpRtw/Qm0MgZRfzwG7tmA2LRx5CiG+kd5BbGd/Y/Fo/+dE3cAJx2DIDPg4gg4MLSTdS7eyxnETmqQoOT/PxZPm9S4AtmzPMRkKdv5pZkzwCrw1nJBH5rE/ANqEAt4/EL5FQAAAABJRU5ErkJggg==');
  }

  create() {
    // Create a group for fruits with physics enabled
    this.fruits = this.physics.add.group();
    
    // Create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });
    
    // Spawn initial fruits
    this.spawnMultipleFruits(5);
    
    // Set up input for slashing fruits
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Check if pointer intersects with any fruit
      const bodies = this.physics.overlapCirc(pointer.x, pointer.y, 10, true, false);
      
      bodies.forEach((body) => {
        if (body.gameObject && this.fruits.contains(body.gameObject)) {
          // Remove the fruit
          body.gameObject.destroy();
          
          // Increment score
          this.score += 10;
          this.scoreText.setText('Score: ' + this.score);
          
          // Spawn a new fruit
          this.spawnFruit();
        }
      });
    });
  }
  
  update() {
    // Check if any fruits are off-screen and respawn them
    this.fruits.getChildren().forEach((fruit: Phaser.GameObjects.GameObject) => {
      const sprite = fruit as Phaser.Physics.Arcade.Sprite;
      
      if (sprite.y > 600 || sprite.y < 0 || sprite.x > 800 || sprite.x < 0) {
        sprite.destroy();
        this.spawnFruit();
      }
    });
  }
  
  spawnFruit() {
    // Random position at the bottom
    const x = Phaser.Math.Between(100, 700);
    const y = 600;
    
    // Create the fruit sprite
    const fruit = this.fruits.create(x, y, 'fruit');
    
    // Set random velocity
    fruit.setVelocity(
      Phaser.Math.Between(-200, 200),  // x velocity
      Phaser.Math.Between(-600, -300)  // y velocity (upward)
    );
    
    // Add some rotation for effect
    fruit.setAngularVelocity(Phaser.Math.Between(-100, 100));
    
    // Set bounce so fruits bounce off world bounds
    fruit.setBounce(0.8);
    fruit.setCollideWorldBounds(true);
  }
  
  spawnMultipleFruits(count: number) {
    for (let i = 0; i < count; i++) {
      this.spawnFruit();
    }
  }
}

export default function FruitSlash() {
  const gameRef = useRef<Phaser.Game | null>(null);
  
  useEffect(() => {
    // Initialize Phaser game
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 200 },
          debug: false
        }
      },
      scene: [FruitSlashScene]
    };
    
    // Create the game instance
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }
    
    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Fruit Slash</h1>
      <div id="game-container" className="border border-gray-300"></div>
    </div>
  );
} 