const date = require("date-and-time");
const  hashing = require("../../managers/hashing.js")
 module.exports = {
	system : (t, e, a) => {
		var user_id = t.userData ;
		var path = t.path;
		var r = [];
		const l = new Date, 
			i = t._ob;
		for (var s = 0; s < i.data.length; s++) {
			const t = i.data[s],
				e = t.created_at;
			date.format(e, "YYYY/MM/DD HH:mm:ss");
			let a = date.subtract(l, e).toSeconds();
			if (a < 60) var p = {
				t: a,
				f: "Sec"
			};
			else {
				let t = date.subtract(l, e).toMinutes();
				if (t < 60) p = {
					t: t,
					f: "Min"
				}; 
				else {
					let t = date.subtract(l, e).toHours();
					if (t < 24) p = {
						t: t,
						f: "Hr"
					};
					else {
						let t = date.subtract(l, e).toDays();
						if (t < 7) p = {
							t: t,
							f: "D"
						};
						else {
							let e = t / 7;
							p = {
								t: e,
								f: "W"
							};
							if (e > 4) {
								let t = e / 4;
								p = {
									t: t,
									f: "M"
								};
								if (t > 12) {
									p = {
										t: t / 12,
										f: "Y"
									}
								}
							}
						}
					}
				}
			}
			for (var n = Math.round(p.t), o = null, f = 0; f < i.measure.length; f++) i.measure[f].grewtale_id == t.id && (o = f);
			var d = 0,
				u = null;
			null === o ? (d = 0, u = null) : (d = i.measure[o].button_value, u = i.measure[o].plotterValueId), r.push({
				data: {
					id: t.id,
					username: t.username,
					first_name: t.first_name,
					w_n: t.w_n,
					type: t.type,
					last_name: t.last_name,
					profilepic: t.profilepic,
					title: t.title,
					content: t.content,
					standard: t.standard,
					accelerator: t.accelerator,
					primitive_id: t.primitive_id,
					file: hashing.urlHashing(t.file, 90),
					file_type: t.file_type,
					profilepic: t.profilepic,
					g_status: t.g_status,
					person: t.person,
					p1: t.p1,
					p2: t.p2,
					p3: t.p3,
					p4: t.p4,
					p5: t.p5,
					p6: t.p6,
					p7: t.p7,
					p8: t.p8,
					time: n,
					format: p.f,
					plotterValueId: u
				},
				active: d
			});

		}
		//const z = hashing.urlHashing(t._ob.data[0].file, t.userData.userId, t.path);
		//console.log(z);
		e.json(r);
	}
};