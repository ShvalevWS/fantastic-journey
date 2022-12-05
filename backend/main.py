from flask import Flask, Response, render_template, request, redirect
from caster.communicative_port import CommunicativePort as com_port
from caster.config_manager import ConfigManager
from caster.helpers import Helper as help
from huawei_lte_api.Client import Client
from huawei_lte_api.Connection import Connection
from huawei_lte_api.exceptions import LoginErrorAlreadyLoginException
from json import loads
from time import sleep


app = Flask(__name__)

_com_port = com_port()
_help = help(com_port=_com_port)
_conf_manager = ConfigManager()


@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/request_config', methods=['POST'])
def configurate_request():
    if request.method == 'POST':
        parsed_json = loads(request.get_data())
        for key, value in parsed_json.items():
            if len(value) != 0:
                _conf_manager.__setter__(section='REQUEST_CONFIG', option=key, value=value)
        
    return redirect('/')


@app.route('/peer_config', methods=['POST'])
def configurate_peer():
    if request.method == 'POST':
        parsed_json = loads(request.get_data())
        for key, value in parsed_json.items():
            if len(value) != 0:
                _conf_manager.__setter__(section='PEER_CONFIG', option=key, value=value)
        
    return redirect('/')


@app.route('/mountlist', methods=['GET'])
def list_mount():
    _mount = _conf_manager.__getter__('PEER_CONFIG', 'r_mountpoint')

    return _mount


@app.route('/corr_request', methods=['GET'])
def corr_request():
     _help.do_corr_request()

     return redirect('/')


@app.route('/modem_status')
def status_stream():
        
    def get_stream_info():
        with Connection('http://admin:WIFITEST@192.168.8.1') as connection:
            while True:
                try:
                    sleep(1)
                    client = Client(connection)
                    signal_strength = client.device.signal()['rsrq']
                    yield f"data: {str(signal_strength)}\n\n"
                except LoginErrorAlreadyLoginException:
                        connection.reload()

    resp = Response(get_stream_info(), mimetype='text/event-stream')
    resp.headers.add('Access-Control-Allow-Origin', '*')

    return resp


if __name__ == '__main__':
    app.run(debug=True)