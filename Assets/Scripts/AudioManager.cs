using System;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class AudioManager : MonoBehaviour
{
    public static AudioManager Instance;

    public Sound[] sounds;
    private bool isMuted = false;

    [Header("Mute Button UI")]
    public Sprite muteIcon;
    public Sprite unmuteIcon;
    private Button muteButton;

    void Awake()
    {
        // Singleton pattern
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
            return;
        }

        // Initialize all sounds
        foreach (Sound s in sounds)
        {
            s.source = gameObject.AddComponent<AudioSource>();
            s.source.clip = s.clip;
            s.source.volume = s.volume;
            s.source.loop = s.loop;
        }
    }

    void OnEnable()
    {
        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    void OnDisable()
    {
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }

    void Update()
    {
        if(Input.GetKeyDown(KeyCode.M))
        {
            ToggleMute();
        }
    }
    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        // Find the new scene's mute button dynamically
        GameObject btnObj = GameObject.Find("Mute"); // Use the exact name in hierarchy
        if (btnObj != null)
        {
            muteButton = btnObj.GetComponent<Button>();
            muteButton.onClick.RemoveAllListeners(); // prevent duplicate listeners
            muteButton.onClick.AddListener(ToggleMute);
            UpdateMuteButtonIcon();
        }

        // Auto-play background music if needed
        if (scene.name == "FreeRunner")
            Play("Background");
    }

    public void Play(string name)
    {
        if (isMuted) return;

        Sound s = Array.Find(sounds, sound => sound.SoundName == name);
        if (s != null) s.source.Play();
    }

    public void Stop(string name)
    {
        Sound s = Array.Find(sounds, sound => sound.SoundName == name);
        if (s != null) s.source.Stop();
    }

    public void ToggleMute()
    {
        isMuted = !isMuted;

        foreach (Sound s in sounds)
            s.source.mute = isMuted;

        // Update button icon
        UpdateMuteButtonIcon();

        // Special fix: restart background music if unmuted and supposed to be playing
        if (!isMuted)
        {
            Sound bg = Array.Find(sounds, sound => sound.SoundName == "Background");
            if (bg != null && !bg.source.isPlaying)
                bg.source.Play();
        }
    }

    private void UpdateMuteButtonIcon()
    {
        if (muteButton != null)
        {
            Image btnImage = muteButton.GetComponent<Image>();
            if (btnImage != null)
                btnImage.sprite = isMuted ? muteIcon : unmuteIcon;
        }
    }

    public bool IsMuted()
    {
        return isMuted;
    }
}