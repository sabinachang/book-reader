const Db = require('../server/services/db');
const dbHandler = new Db()

let superagent = require('superagent');
let PORT = 4001;
let HOST = 'http://localhost:' + PORT;

let app = require('../server/app');
var server;

describe("Testing registration, login, and user functions", function () {
	beforeAll(async () => {
		await dbHandler.connect("test");
		server = app.listen(PORT);
	});


	beforeEach(async (done) => {
		this.agent = superagent.agent();
		done()
	})

	afterEach(async () => {
		this.agent = null;
		await dbHandler.clearDatabase("test")
	});

	afterAll(async () => {
		await dbHandler.closeDatabase("test");
		await server.close();
	});


	test("Can create a new user", async (done) => {
		let user1 = { username: "Austin", password: "123456" }
		await this.agent.post(HOST + '/api/users/register')
			.send(user1)
			.end(function (err, res) {
				expect(res.statusCode).toBe(201);
				console.log(res.body)
				done()
			})
	})

	test("Can logout after creating a new user", async (done) => {
		let user1 = { username: "Austin", password: "123456" }
		await this.agent.post(HOST + '/api/users/register')
			.send(user1)
		this.agent.post(HOST + '/api/users/logout')
			.send(user1)
			.end(function (err, res) {
				expect(res.statusCode).toBe(200);
				done()
			})
	})

	test("Can login after creating a new user", async (done) => {
		let user1 = { username: "Austin", password: "123456" }
		await this.agent.post(HOST + '/api/users/register')
			.send(user1)
		await this.agent.post(HOST + '/api/users/logout')
			.send(user1)
		await this.agent.post(HOST + '/api/users/login')
			.send(user1)
			.end(function (err, res) {
				expect(res.statusCode).toBe(200);
				done()
			})
	})

	test("Cannot login with a non-existing user", async (done) => {
		let user1 = { username: "Austin", password: "123456" }
		await this.agent.post(HOST + '/api/users/login')
			.send(user1)
			.end(function (err, res) {
				expect(res.statusCode).toBe(404);
				done()
			})
	})
})
