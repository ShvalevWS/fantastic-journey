from typing import Tuple
from enum import Enum
from functools import wraps
import configparser, base64, os
from patterns import Singleton
import app_logger

logger = app_logger.get_logger(__name__)

class ConfigManager(Singleton):
    def get_app_file_path(file: str) -> str:
        """Return the absolute path of the app's files. They should be in the same folder as this py file."""
        folder,_ = os.path.split(__file__)
        file_path = os.path.join(folder,file)
        return file_path

    config = configparser.ConfigParser()
    config.read(get_app_file_path("config.ini"))
    username = config["PEER_CONFIG"]["username"]
    password = config["PEER_CONFIG"]["password"]
    mountpoint = config["PEER_CONFIG"]["mountpoint"]
    port = config["PEER_CONFIG"]["port"]
    r_username = config["REQUEST_CONFIG"]["r_username"]
    r_password = config["REQUEST_CONFIG"]["r_password"]
    r_mountpoint = config["REQUEST_CONFIG"]["r_mountpoint"]
    r_port = config["REQUEST_CONFIG"]["r_port"]
    r_host = config["REQUEST_CONFIG"]["r_host"]
    
    global absolute_path
    absolute_path = get_app_file_path('config.ini')


    def __setter__(self, section: str, option: str, value: str) -> None:
        ConfigManager.config.set(f'{section}', f"{option}", f"'{value}'")
        _absolute_path = absolute_path

        with open(_absolute_path, 'w') as configfile:
            ConfigManager.config.write(configfile)

        if not configfile.closed:
            configfile.close()

        logger.info('User successfully set an config option')

        return None      


    def __getter__(self, section: str, option: str) -> str:
        _updated_config = ConfigManager.config
        _updated_config.read(absolute_path)
        value = _updated_config.get(f'{section}', f'{option}').replace("'", "") 

        logger.info('User successfully got an config option')

        return value


class RequestOptions(Enum):
    """Enum to enumerate server commands to rewrite the options
    of configfile. The commands is the variable names, to define
    the request name. The values in configfile is the values of
    these variables"""
    set_username = 'username'
    set_password = 'password'
    set_port = "port"
    set_mountpoint = "mountpoint"
    set_request_username = "r_username"
    set_request_password = 'r_password'
    set_request_mountpoint = 'r_mountpoint'


class NotAuthenticatedError(Exception):
    """Raised if user is not authenticated"""


class WrongMountpointError(Exception):
    """Raised if mountpoint is wrong"""


class HeadersParser:
    def parse_headers(request: bytearray) -> Tuple:
        headers = []
        auth = ''
        method = ''
        mountpoint = ''
        request_text = str(request).split('\r\n')
        for elements in request_text:
            headers.append(elements)
            for head in headers:
                if 'Authorization:' in head:
                    auth = head.split(':')[1][7:]
                if 'GET' in head:
                    method = head.split()[0]
                    mountpoint = head.split()[1]
        return auth, method, mountpoint

_config_manager = ConfigManager()

def auth_required(func):
    """Decorator to check the request authentication.
    Takes request as the argument from decorated function"""
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        conf_username = _config_manager.__getter__('PEER_CONFIG', 'username')
        conf_password = _config_manager.__getter__('PEER_CONFIG', 'password')
        checkline = HeadersParser.parse_headers(*args)[0]
        keyline = base64.b64encode(f'{conf_username}:{conf_password}'.replace("'", "").encode('ascii'))
        keyline = keyline.decode('ascii')
        if keyline == checkline:
            return func(self, *args, **kwargs)
        else:
            logger.warning('User send wrong credentials!')
            raise NotAuthenticatedError(f"Got {checkline} instead {keyline}")

    return wrapper 


def mount_required(func):
    """Decorator to check the request mountpoint
    takes request as the argument from decorated 
    function"""
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        conf_mountpoint = _config_manager.__getter__('PEER_CONFIG', 'mountpoint')
        checkline = HeadersParser.parse_headers(*args)[2].replace("/", "")
        keyline = str(conf_mountpoint).replace("'", "")
        if keyline == checkline:
            return func(self, *args, **kwargs)
        else:
            logger.warning('User send wrong mountpoint!')
            raise WrongMountpointError(f"Got {checkline} instead {keyline}")

    return wrapper
