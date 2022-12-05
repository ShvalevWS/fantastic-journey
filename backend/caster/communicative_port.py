# from serial_asyncio import open_serial_connection
from serial import Serial, SerialException
from pyrtcm import RTCMReader
from caster.patterns import Singleton
import caster.app_logger as app_logger

class CommunicativePort(Singleton):
    def __init__(self) -> None:
        self.logger = app_logger.get_logger(__name__)
        self.logger.info('Trying to open serial connection')
        self.stream = self.wait_connection()
        self.rtcm_reader = self.open_rtcm_reader()
        


    def wait_connection(self) -> Serial:    
        while True:
            for i in range(11):    
                try:
                    port = f'/dev/ttyACM{i}'
                    stream = Serial(port, baudrate=115200, timeout=2)
                    self.logger.info('Device connected')
                    return stream
                except SerialException:
                    pass
                    continue


    def open_rtcm_reader(self) -> RTCMReader:
        try:
            self.rtcm_reader = RTCMReader(self.stream)
            return self.rtcm_reader
        except Exception as e:
            self.logger.warning('RTCMReader openning error')
            pass 


    def print_parsed_stream(self) -> None:
        while True:
            try:
                for (raw_data, parsed_data) in self.rtcm_reader:
                    print(parsed_data)
            except SerialException:
                self.__init__()


    def gngga_line(self) -> str:
        while True:
            try:
                line = str(self.stream.readline())
                result = line.replace('b', '').replace("'", "")
                dict_line = result.split(",")
                word = "$GNGGA"
                if dict_line[0] == word:
                    final = ",".join(dict_line)
                    return final
            except SerialException:
                self.__init__()
            