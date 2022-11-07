import socket, time, base64
import sys
import os
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))
from caster.config_manager import ConfigManager
import caster.app_logger as app_logger

class Helper:
    def __init__(self, com_port) -> None:
        self.logger = app_logger.get_logger(__name__)
        self.com_port = com_port
        self.rtcm_reader = self.com_port.open_rtcm_reader()
        self.ser = self.com_port.stream
        self._conf_manager = ConfigManager() 
        self.check_for_gngga()
        self.check_for_rtcm()
        self.r_username = self._conf_manager.__getter__('REQUEST_CONFIG','r_username')
        self.r_password = self._conf_manager.__getter__('REQUEST_CONFIG','r_password')
        self.r_port = self._conf_manager.__getter__('REQUEST_CONFIG','r_port')
        self.r_host = self._conf_manager.__getter__('REQUEST_CONFIG','r_host')
        self.r_mountpoint = self._conf_manager.__getter__('REQUEST_CONFIG','r_mountpoint')


    def do_corr_request(self) -> bool:
            username = self.r_username
            password = self.r_password
            port = self.r_port
            host = self.r_host
            mountpoint = self.r_mountpoint
            pwd = base64.b64encode("{}:{}".format(username, password).encode('ascii'))
            pwd = pwd.decode('ascii')
            header = \
                f"GET /{mountpoint} HTTP/1.1\r\n" + \
                f"Host: {host}\r\n" + \
                "Ntrip-Version: Ntrip/2.0\r\n" + \
                "User-Agent: NTRIP NtripClientPOSIX/1.51\r\n" + \
                "Connection: close\r\n" + \
                "Authorization: Basic {}\r\n\r\n".format(pwd)
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((host, int(port)))
            s.send(header.encode('ascii')) #+ self.com_port.gngga_line().encode('ascii')
            time.sleep(2)
            data = s.recv(4096)
            self.ser.write(data)
            self.logger.info(f'Sent correction request to {host}')
            return True


    def check_for_gngga(self) -> bool:
        self.logger.info('Waiting for gngga line...')
        while True:
            if 'M,,' in self.com_port.gngga_line():
                self.logger.info('Found an GNGGA line!')
                return True
            else: continue


    def check_for_rtcm(self) -> bool:
        self.logger.info('Searching for 1005 RTCM string...')
        for (raw_data, parsed_data) in self.rtcm_reader:
            if '<RTCM(1005' in str(parsed_data):
                self.logger.info(f'Got 1005 RTCM string!')
                return True
            else: continue


# OPTIONAL
    # def check_for_correction(self) -> bool:
    #     print('Cheking the correction')
    #     while True:
    #         if 'M,,' not in self.com_port.gngga_line():
    #             print('Correction is right')
    #             return True
    #         else: continue        
     