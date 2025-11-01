// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.46
// 

using Colyseus.Schema;

public partial class Player : Schema {
	[Type(0, "ref", typeof(MovementData))]
	public MovementData movementData = new MovementData();

	[Type(1, "ref", typeof(MovementStateData))]
	public MovementStateData movementStateData = new MovementStateData();

	[Type(2, "ref", typeof(HealthData))]
	public HealthData healthData = new HealthData();

	[Type(3, "ref", typeof(WeaponData))]
	public WeaponData weaponData = new WeaponData();

	[Type(4, "ref", typeof(PlayerStateData))]
	public PlayerStateData playerStatedata = new PlayerStateData();

	[Type(5, "ref", typeof(ScoreData))]
	public ScoreData scoreData = new ScoreData();
}

