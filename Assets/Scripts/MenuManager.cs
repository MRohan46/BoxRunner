using System.Runtime.CompilerServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour
{
    public void OnClickStart()
    {
        FindObjectOfType<AudioManager>().Play("Click");
        Invoke(nameof(LoadGame), 0.2f);
    }

    void LoadGame()
    {
        SceneManager.LoadScene("FreeRunner");
    }

    public void OnClickExit()
    {
        FindObjectOfType<AudioManager>().Play("Click");
        Invoke(nameof(QuitGame), 0.2f);
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