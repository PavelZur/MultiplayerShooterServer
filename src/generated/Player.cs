// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.46
// 

using Colyseus.Schema;

public partial class Player : Schema {
	[Type(0, "number")]
	public float px = default(float);

	[Type(1, "number")]
	public float py = default(float);

	[Type(2, "number")]
	public float pz = default(float);

	[Type(3, "number")]
	public float vx = default(float);

	[Type(4, "number")]
	public float vy = default(float);

	[Type(5, "number")]
	public float vz = default(float);

	[Type(6, "number")]
	public float rx = default(float);

	[Type(7, "number")]
	public float ry = default(float);

	[Type(8, "number")]
	public float ground = default(float);

	[Type(9, "number")]
	public float sit = default(float);

	[Type(10, "number")]
	public float anspeed = default(float);

	[Type(11, "number")]
	public float health = default(float);

	[Type(12, "uint8")]
	public byte weapon = default(byte);
}

