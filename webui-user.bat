@echo off

set PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:2048
set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--deepdanbooru
call webui.bat
