const hippie = require('hippie');
const AppServer = require('../../bin/app/server');
const assert = require('assert');
const sinon = require('sinon');
const commandHandler = require('../../bin/modules/user/repositories/commands/command_handler');

describe('Login Me', () => {

  let appServer;

  let payload = {
    'username': 'alifsn',
    'password': 'telkomdev123'
  };

  let result = {
    'success': true,
    'data': `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWZzbiIsInN1YiI6I
    jViYWM1M2I0NWVhNzZiMWU5YmQ1OGUxYyIsImlhdCI6MTU0MDQ0NTAxOCwiZXhwIjoxNTQwNDUxMDE4LCJh
    dWQiOiI5N2IzMzE5My00M2ZmLTRlNTgtOTEyNC1iM2E5YjlmNzJjMzQiLCJpc3MiOiJ0ZWxrb21kZXYifQ.
    RKqMRY5iHaUmK0080hfrorXTo1Y4j5--s6aaGZFVGVW1_kxYpdagb0bJP8COxQco0TYVABpYKeX7PqjothO
    Ch84bILZLOkwLS4E08rZEvWrq6-jrV4unXShZXM3duN85m563tMT8dB1zeODM7_0xv1IeK7VPKv829Fokbi
    Jknzno7J9mGFeKn73qXHhHMQ1zOIayd_gEucsPFApoUuXB6kOMtcUrapbz9mSI5T3uyU0ihMkv2Ffvn1xcd
    OeUV0JbNJwdjmnJpalquJiJTmV4a95pEp_4ypJ4c_e2_ZjDxl06y4L_dd__gDm30VVN4cXUV8KNQQdTnqJZ
    s9pMcnlYoIR_todY9HnGcDrvfSR6_RCYIg6ww9xZ9cJG48xWmdK_ZRi6JqvrN47QTnELlSTN0d87xbIZ6V1
    e5YGoUTB2gJt4ceUgE2CUFKDkRV461hxhGYgS7dsgKuOz4SF5EnVwQ1TxaB2KSa2DmQl4VQIKNyGcGps7Ds
    z0x8SS0s9Pd38zPRBYPMe7qXYV9z052a4B-UxFXammbWTB5GTKMmmmVMJ0iyFfWwn3V_hBeW8IPwGznoLPy
    5XWt4WudKsB18t9pr8_yzBMbJKwUraAYhvG481dlkbFXfeDO4_8hs570sl9C77Jg9enooPFi85gZtMy4zLf
    8L0E0AbiEo1QwPy7QZI`,
    'message': 'Your Request Has Been Processed',
    'code': 200
  };

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should error when post data for /api/users/v1', function (done) {
    hippie(this.server)
      .post('/api/users/v1')
      .send()
      .expectStatus(401)
      .end(done);
  });

  it('Should error when post data for /api/users/v1', function (done) {
    hippie(this.server)
      .header('authorization','Basic dGVsa29tMTIzOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .post('/api/users/v1')
      .send()
      .expectStatus(401)
      .end(done);
  });

  it('Should return posted data for /api/users/v1', function (done) {

    sinon.stub(commandHandler, 'postDataLogin').resolves(result);

    /* eslint handle-callback-err: ["error", "error"] */
    hippie(this.server)
      .header('authorization','Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .json()
      .post('/api/users/v1')
      .send(payload)
      .expectStatus(201)
      .end((err, res, body) => {
        assert.equal(body.success, true);
        assert.equal(body.code, 200);

        commandHandler.postDataLogin.restore();
        done();
      });
  });

});
