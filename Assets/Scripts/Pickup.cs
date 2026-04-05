using UnityEngine;

public class Pickup : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            other.GetComponent<PlayerInvincibility>()
                 .ActivateInvincibility();

            Destroy(gameObject);

            FindObjectOfType<AudioManager>().Play("Pickup");

        }
    }
}