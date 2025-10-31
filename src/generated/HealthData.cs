// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.46
// 

using Colyseus.Schema;

public partial class HealthData : Schema {
	[Type(0, "int16")]
	public short curHealth = default(short);

	[Type(1, "int16")]
	public short maxHealth = default(short);
}

