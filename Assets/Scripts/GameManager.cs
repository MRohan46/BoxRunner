using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public PlayerMovement movement;
    private bool IsGameOver = false;
    public float RestartDelay = 1f;
    public GameObject gameOverUI;
    public GameObject pauseMenuUI;

    void Update()
    {
        if(IsGameOver)
        {
            if(Input.GetKeyDown(KeyCode.R) || Input.touchCount > 0 )
            {
                Restart();
                
            }
        }

        if(Input.GetKeyDown(KeyCode.Q))
        {
            QuitGame();
        }
    }
    public void GameOver()
    {
        if(IsGameOver == false)
        {
            IsGameOver = true;
            gameOverUI.SetActive(true);
            pauseMenuUI.SetActive(false);
            movement.enabled = false;
            FindObjectOfType<AudioManager>().Play("GameOver");
            FindObjectOfType<AudioManager>().Stop("Background");

        }
    }

    void Restart()
    {
        FindObjectOfType<AudioManager>().Play("Restart");

        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
    
    void QuitGame()
    {
    #if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
    #else
        Application.Quit();
    #endif
    }
}
