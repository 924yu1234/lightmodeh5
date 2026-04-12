/* eslint-disable react/button-has-type */
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import * as icons from 'js/components/Icons/index';

// node js/apps/icons/createIcons.js

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const iconData = useMemo(() => {
    return Object.keys(icons).map((key) => {
      const iconName = key.replace(/^ICON/, '');
      const category =
        iconName.match(/^(CopyTrade|Raffle|Nav|Account|Status|Opr)/)?.[1] ||
        'General';
      return {
        key,
        name: iconName,
        component: icons[key],
        category,
      };
    });
  }, []);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(iconData.map((icon) => icon.category))];
    return cats.sort();
  }, [iconData]);

  const filteredIcons = useMemo(() => {
    return iconData.filter((icon) => {
      const matchesSearch = icon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [iconData, searchTerm, selectedCategory]);

  return (
    <StyledIcons>
      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="搜索图标..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="icon-count">
            显示 {filteredIcons.length} / {iconData.length} 个图标
          </div>
        </div>
        <div className="category-section">
          <span className="category-label">分类:</span>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? '全部' : category}
              {category !== 'all' && (
                <span className="count">
                  (
                  {iconData.filter((icon) => icon.category === category).length}
                  )
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="icons-grid">
        {filteredIcons.map((icon) => {
          const I = icon.component;
          return (
            <div className="item" key={icon.key}>
              <div className="item-icon">
                <I size={40} />
              </div>
              <div className="item-title">{icon.name}</div>
              <div className="item-category">{icon.category}</div>
            </div>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="no-results">没有找到匹配的图标</div>
      )}
    </StyledIcons>
  );
}

const StyledIcons = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;

  .controls {
    margin-bottom: 30px;
    background: ${({ theme }) => theme.bg_f5f5f5};
    padding: 20px;
    border-radius: 8px;

    .search-section {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 15px;

      .search-input {
        padding: 8px 12px;
        border: 1px solid ${({ theme }) => theme.border_ddd};
        border-radius: 4px;
        font-size: 14px;
        width: 250px;

        &:focus {
          outline: none;
          border-color: ${(props) => props.theme.border_1890ff};
        }
      }

      .icon-count {
        color: ${(props) => props.theme.t_666};
        font-size: 14px;
      }
    }

    .category-section {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

      .category-label {
        font-weight: 600;
        color: ${(props) => props.theme.t_333};
        margin-right: 10px;
      }

      .category-btn {
        padding: 6px 12px;
        border: 1px solid ${({ theme }) => theme.border_ddd};
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;

        &:hover {
          background: ${({ theme }) => theme.bg_f0f0f0};
        }

        &.active {
          background: ${(props) => props.theme.bg_1890ff};
          color: white;
          border-color: ${(props) => props.theme.border_1890ff};
        }

        .count {
          margin-left: 4px;
          font-size: 12px;
          opacity: 0.8;
        }
      }
    }
  }

  .icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.border_e8e8e8};
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .item-icon {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
    }

    .item-title {
      font-weight: 600;
      text-align: center;
      margin-bottom: 5px;
      font-size: 14px;
      color: ${({ theme }) => theme.t_fff};
      word-break: break-word;
    }

    .item-category {
      font-size: 12px;
      color: ${(props) => props.theme.t_999};
      background: ${({ theme }) => theme.bg_f0f0f0};
      padding: 2px 8px;
      border-radius: 12px;
    }
  }

  .no-results {
    text-align: center;
    padding: 40px;
    color: ${(props) => props.theme.t_666};
    font-size: 16px;
  }
`;
