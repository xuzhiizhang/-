import torch
from torch import nn
import numpy as np
import matplotlib.pyplot as plt

# 数据预处理
import pandas as pd
import datetime
import os
import h5py
import numpy as np
import time
#读取h5文件
# f = h5py.File('path/filename.h5','r') #打开h5文件
f = h5py.File('E:/system_default\desktop/traffic_project/dataset/metr-la.h5','r')
f.keys() #可以查看所有的主键
print(f['df'].keys())
for key in f['df'].keys():
    print(f['df'][key][:].shape)
#转换成dataframe格式并将时间作为下标
print(f['df']['axis1'][:])
data=f['df']['block0_values']
timelist=np.array([])
df_data=pd.DataFrame(data)
for times in f['df']['axis1']:
    tmptime=float(times/1000000000)
    Time = time.localtime(tmptime)#秒时间戳
    standardTime = time.strftime("%Y-%m-%d %H:%M:%S", Time)
    timelist=np.append(timelist,standardTime)
df_data['axis1']=timelist
df_data=df_data.set_index('axis1')
print(df_data)
#
# df = pd.read_excel('real_data.xlsx')    # 这个会直接默认读取到这个Excel的第一个表单
# value = df['湖北现有确诊'].values[0:67]
# #value = df['全国累计确诊'].values[10:50]
# print(len(value))
x = []
y = []
seq = 3
for i in range(len(df_data)-seq):
    x.append(df_data[0][i:i+seq])
    y.append(df_data[0][i+seq])
    print(df_data[:][i:i+seq])
print(x)
# print(len(x))   # 67
#
train_x = (torch.tensor(x[:50]).float()/100.).reshape(-1, seq, 1)
train_y = (torch.tensor(y[:50]).float()/100.).reshape(-1, 1)
test_x = (torch.tensor(x[50:]).float()/100.).reshape(-1, seq, 1)
test_y = (torch.tensor(y[50:]).float()/100.).reshape(-1, 1)
print(len(train_x))
print(len(test_x))
#模型训练
class LSTM(nn.Module):
    def __init__(self):
        super(LSTM, self).__init__()
        self.lstm = nn.LSTM(input_size=207, hidden_size=16, num_layers=1, batch_first=True)
        self.linear = nn.Linear(16 * seq, 1)
    def forward(self, x):
        x, (h, c) = self.lstm(x)
        x = x.reshape(-1, 16 * seq)
        x = self.linear(x)
        return x
# #
# 模型训练
model = LSTM()
optimzer = torch.optim.Adam(model.parameters(), lr=0.005)
loss_func = nn.MSELoss()
model.train()
#
for epoch in range(400):
    output = model(train_x)
    loss = loss_func(output, train_y)
    optimzer.zero_grad()
    loss.backward()
    optimzer.step()
    if epoch % 20 == 0:
        tess_loss = loss_func(model(test_x), test_y)
        print("epoch:{}, train_loss:{}, test_loss:{}".format(epoch, loss, tess_loss))

# # 模型预测、画图
# model.eval()
# prediction = list((model(train_x).data.reshape(-1))*100000) + list((model(test_x).data.reshape(-1))*100000)
# print(prediction)
# plt.plot(value[3:], label='True Value')
# plt.plot(prediction[:51], label='LSTM fit')
# plt.plot(np.arange(50, 64, 1), prediction[50:64], label='LSTM pred')
# print(len(value[3:]))
# print(len(prediction))
# for i in range(len(prediction)):
#     print(int(prediction[i]))
# plt.legend(loc='best')
# plt.title('Active infections prediction(Hubei province)')
# plt.xlabel('Day')
# plt.ylabel('Active Cases')
# plt.show()
