using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GroundCollider : MonoBehaviour
{
    public Transform player;
    public BoxCollider groundCollider; // the long invisible box


    void Update() {
        Vector3 pos = groundCollider.transform.position;
        pos.z = player.position.z;
        groundCollider.transform.position = pos;
    }
}
