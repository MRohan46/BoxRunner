using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody rb;
    public float forwardSpeed = 2000f;
    public float sidewaysForce = 100f;

    private float screenWidthHalf;

    void Start()
    {
        screenWidthHalf = Screen.width / 2f;
    }
    void FixedUpdate()
    {
        

        rb.AddForce(0, 0, forwardSpeed *Time.deltaTime);
        if (Input.GetKey(KeyCode.D))
        {
            rb.AddForce(sidewaysForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
        }

        if (Input.GetKey(KeyCode.A))
        {
            rb.AddForce(-sidewaysForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
        }

        // Touch Input
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);

            // Left side of screen
            if (touch.position.x < Screen.width / 2f)
            {
                rb.AddForce(-sidewaysForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
            }
            // Right side of screen
            else
            {
                rb.AddForce(sidewaysForce * Time.deltaTime, 0, 0, ForceMode.VelocityChange);
            }
        }


        if(rb.position.y < -1f)
        {
            rb.constraints = RigidbodyConstraints.FreezeAll;
            FindObjectOfType<GameManager>().GameOver();
            
        }
        
    }
}