using UnityEngine;

public class CollisionDetector : MonoBehaviour
{   
    
    void OnCollisionEnter(Collision collision)
    {
        if(collision.collider.tag == "Obstacle")
        {         
            FindObjectOfType<GameManager>().GameOver();
            FindObjectOfType<AudioManager>().Play("Hit");
        }
    }
}
