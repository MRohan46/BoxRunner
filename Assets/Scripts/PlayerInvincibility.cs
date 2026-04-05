using UnityEngine;
using System.Collections;

public class PlayerInvincibility : MonoBehaviour
{
    public float invincibleDuration = 5f;
    public Material invincibleMaterial;

    private Material normalMaterial;
    private Renderer playerRenderer;
    private bool isInvincible = false;

    void Awake()
    {
        playerRenderer = GetComponent<Renderer>();
        normalMaterial = playerRenderer.material;
    }

    public void ActivateInvincibility()
    {
        if (!isInvincible)
            StartCoroutine(InvincibilityRoutine());
    }

    IEnumerator InvincibilityRoutine()
    {
        isInvincible = true;

        int playerLayer = LayerMask.NameToLayer("Player");
        int obstacleLayer = LayerMask.NameToLayer("Obstacle");

        Physics.IgnoreLayerCollision(playerLayer, obstacleLayer, true);

        playerRenderer.material = invincibleMaterial;

        float timer = 0f;
        float flickerStart = invincibleDuration - 1f;
        float flickerTimer = 0f;
        float flickerInterval = 0.1f;

        while (timer < invincibleDuration)
        {
            timer += Time.deltaTime;

            if (timer >= flickerStart)
            {
                flickerTimer += Time.deltaTime;

                if (flickerTimer >= flickerInterval)
                {
                    playerRenderer.material =
                        playerRenderer.material == normalMaterial
                        ? invincibleMaterial
                        : normalMaterial;

                    flickerTimer = 0f;
                }
            }

            yield return null;
        }

        playerRenderer.material = normalMaterial;
        Physics.IgnoreLayerCollision(playerLayer, obstacleLayer, false);

        isInvincible = false;
    }
}