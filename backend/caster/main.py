from helpers import Helper as helper
from communicative_port import CommunicativePort as com_port, SerialException
from config_manager import auth_required, mount_required
import asyncio

class Caster:
    def __init__(self):
        self.com_port = com_port()
        self.help = helper()
        self.help.main()
        self.rtcm_reader = self.com_port.open_rtcm_reader()
        

    async def run_server(self, host: str, port: int) -> None:
        server = await asyncio.start_server(self.serve_client, host, port)
        await server.serve_forever()


    async def serve_client(self, reader, writer) -> None:
        request = await self.read_request(reader)

        if request is None:
            print('Client unexpectedly disconnected')
        elif b'GNGGA' in request:
            pass
        else:
            try:
                response = b'HTTP 200 OK ' + await self.handle_request(request)
            except SerialException:
                self.__init__()
            await self.write_response(writer, response)


    async def read_request(self, reader) -> None:
        request = bytearray()
        while True:
            chunk = await reader.read(1024)
            if not chunk:
                break
            request += chunk
            request = request.decode('ascii')
        
            return request

        return None


    @auth_required
    @mount_required
    async def handle_request(self, request) -> str:
        lst = []
        for (raw_data, parsed_data) in self.rtcm_reader:
            RTCM = ['<RTCM(4072', '<RTCM(1077', '<RTCM(1087', '<RTCM(1097', '<RTCM(1127', '<RTCM(1230', '<RTCM(1005']
            if RTCM[0] in str(parsed_data):
                lst.append(raw_data)
            elif RTCM[1] in str(parsed_data):
                lst.append(raw_data)
            elif RTCM[2] in str(parsed_data):
                lst.append(raw_data)
            elif RTCM[3] in str(parsed_data):
                lst.append(raw_data)
            elif RTCM[4] in str(parsed_data):
                lst.append(raw_data)
            if RTCM[5] in str(parsed_data):
                lst.append(raw_data)
            elif RTCM[6] in str(parsed_data):
                lst.append(raw_data)
                break
        string = b''.join(sorted(lst))
        return string


    async def write_response(self, writer, response) -> None:
        writer.write(response)
        await writer.drain()
        writer.close()


if __name__ == '__main__':
    caster = Caster()
    asyncio.run(caster.run_server('0.0.0.0', 2101))
    